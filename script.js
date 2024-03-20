document.getElementById('gradeCalculator').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get the values from the form
    const quizzes = parseFloat(document.getElementById('quizzes').value);
    const midterm1 = parseFloat(document.getElementById('midterm1').value);
    const midterm2 = parseFloat(document.getElementById('midterm2').value);
    const midterm3 = parseFloat(document.getElementById('midterm3').value);
    const participation = parseFloat(document.getElementById('participation').value);
    const finalExam = parseFloat(document.getElementById('finalExam').value);
    
    // Calculate the final grade
    const midtermsAverage = (midterm1 + midterm2 + midterm3) / 3;
    const finalGrade = (quizzes * 0.5) + (midtermsAverage * 0.2) + (participation * 0.05) + (finalExam * 0.25);
    
    // Display the result
    document.getElementById('result').innerText = `Your final grade is: ${finalGrade.toFixed(2)}%`;
  
    // Update the charts with the new data
    updateCharts(quizzes, [midterm1, midterm2, midterm3], participation, finalExam);
    updateProgressBars(finalGrade);
  });
  
  // Function to update charts after form submission
  function updateCharts(quizzes, midterms, participation, finalExam) {
    // Calculate midterms average
    const midtermsAverage = midterms.reduce((a, b) => a + b, 0) / midterms.length;
  
    // Clear previous canvas content to avoid overlay of charts
    const chartStatus = Chart.getChart("gradeDistributionChart"); // Check if chart instance exists
    if (chartStatus != undefined) {
      chartStatus.destroy(); // Destroy existing chart instance before creating a new one
    }
  
    // Create stacked bar chart for grade distribution
    const ctx = document.getElementById('gradeDistributionChart').getContext('2d');
    const gradeDistributionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Grade Distribution'],
        datasets: [
          {
            label: 'Quizzes',
            data: [quizzes * 0.5],
            backgroundColor: 'rgba(255, 99, 132, 0.5)'
          },
          {
            label: 'Midterms',
            data: [midtermsAverage * 0.2],
            backgroundColor: 'rgba(54, 162, 235, 0.5)'
          },
          {
            label: 'Participation',
            data: [participation * 0.05],
            backgroundColor: 'rgba(255, 206, 86, 0.5)'
          },
          {
            label: 'Final Exam',
            data: [finalExam * 0.25],
            backgroundColor: 'rgba(75, 192, 192, 0.5)'
          }
        ]
      },
      options: {
        indexAxis: 'y',
        scales: {
          x: {
            stacked: true,
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Update progress bars based on current grade
  function updateProgressBars(finalGrade) {
    // Assuming you have an element with id='overallProgress' for the overall progress bar
    // You might need to add this in your HTML
    const overallProgressEl = document.createElement('div');
    overallProgressEl.style.width = '100%';
    overallProgressEl.style.backgroundColor = '#ddd';
  
    const progressBar = document.createElement('div');
    progressBar.style.width = `${finalGrade}%`;
    progressBar.style.backgroundColor = finalGrade >= 90 ? 'green' : finalGrade >= 70 ? 'orange' : 'red';
    progressBar.style.height = '20px';
    progressBar.textContent = `${finalGrade.toFixed(2)}%`;
  
    overallProgressEl.appendChild(progressBar);
  
    // Append the progress bar to your page - adjust the selector as needed
    const resultDiv = document.getElementById('result');
    if (resultDiv.nextSibling) {
      resultDiv.parentNode.insertBefore(overallProgressEl, resultDiv.nextSibling);
    } else {
      resultDiv.parentNode.appendChild(overallProgressEl);
    }
  }
  