fetch('../oneway_anova_results.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const container = document.getElementById('anova-container');
    
    if (!data || Object.keys(data).length === 0) {
      container.innerHTML = '<p>No data available to display.</p>';
      return;
    }

    console.log(data);
    
    Object.keys(data).forEach(key => {
      const section = document.createElement('div');
      const title = document.createElement('h2');
      section.appendChild(title);

      const table = document.createElement('table');

      // Table headers
      const headers = ["Index", "Sum of Squares", "Degrees of Freedom", "F Value", "P-Value (PR > F)"];
      const thead = document.createElement('thead');
      const headRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headRow.appendChild(th);
      });
      thead.appendChild(headRow);
      table.appendChild(thead);

      // Table body
      const tbody = document.createElement('tbody');
      data[key].forEach(row => {
        const tr = document.createElement('tr');
        
        // Row data with validation for NaN and non-numeric values
        const rowData = [
          row.index,
          row.sum_sq.toFixed(4),
          row.df.toFixed(4),
          isNaN(row.F) || row.F === "NaN" ? '-' : row.F.toFixed(4),
          isNaN(row["PR(>F)"]) || row["PR(>F)"] === "NaN" ? '-' : row["PR(>F)"].toFixed(4)
        ];

        rowData.forEach(value => {
          const td = document.createElement('td');
          td.textContent = value;
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      section.appendChild(table);
      container.appendChild(section);
    });
  })
  .catch(error => {
    console.error('Error loading JSON:', error);
    document.getElementById('anova-container').innerHTML = '<p>Error loading data.</p>';
  });
