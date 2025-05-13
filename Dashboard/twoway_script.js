window.onload = function () {
    fetch('../twoway_anova_results.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('anovaTableBody');
            const heading = document.getElementById('heading');

            if (!tableBody || !heading) {
                console.error("Required HTML elements not found!");
                return;
            }

            heading.innerHTML = '';

            data.forEach(row => {
                const tr = document.createElement('tr');

                tr.innerHTML = `
                    <td>${row.index}</td>
                    <td>${row.sum_sq != null ? row.sum_sq.toFixed(4) : 'N/A'}</td>
                    <td>${row.df != null ? row.df : 'N/A'}</td>
                    <td>${row.F != null ? row.F.toFixed(4) : 'N/A'}</td>
                    <td>${row["PR(>F)"] != null ? row["PR(>F)"].toFixed(4) : 'N/A'}</td>
                `;

                tableBody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error loading JSON:', error);
        });
};
