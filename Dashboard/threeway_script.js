fetch('../threeway_anova_results.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load JSON file');
        }
        return response.json();
    })
    .then(data => {
        const tableBody = document.querySelector('#anovaTable tbody');
        if (!tableBody) {
            throw new Error('Table body not found');
        }

        data.forEach(row => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.index}</td>
                <td>${row.sum_sq}</td>
                <td>${row.df}</td>
                <td>${row.F}</td>
                <td>${row["PR(>F)"]}</td>
            `;
            tableBody.appendChild(tr);
        });
    })
    .catch(error => {
        console.error('Error loading JSON:', error);
    });
