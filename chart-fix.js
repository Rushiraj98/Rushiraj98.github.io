// CHART.JS FIX - Better initialization
// Add this after Chart.js loads

function initSkillsChartsFixed() {
  // Wait for Chart.js to be fully loaded
  if (typeof Chart === 'undefined') {
    console.log('⏳ Waiting for Chart.js...');
    setTimeout(initSkillsChartsFixed, 100);
    return;
  }

  console.log('✅ Chart.js loaded, initializing charts...');

  const theme = document.documentElement.getAttribute('data-theme') || 'dark';
  const isDark = theme === 'dark';

  // Better color scheme
  const colors = {
    text: isDark ? '#e5e7eb' : '#374151',
    textSecondary: isDark ? '#9ca3af' : '#6b7280',
    grid: isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)',
    primary: '#10b981',
    primaryTransparent: 'rgba(16, 185, 129, 0.15)'
  };

  // Radar Chart Configuration
  const radarCtx = document.getElementById('skillsRadarChart');
  if (radarCtx) {
    // Destroy existing chart
    if (window.radarChart) {
      window.radarChart.destroy();
    }

    // Force canvas size
    radarCtx.style.maxWidth = '500px';
    radarCtx.style.maxHeight = '500px';

    try {
      window.radarChart = new Chart(radarCtx, {
        type: 'radar',
        data: {
          labels: [
            'LLMs & GenAI',
            'MLOps & Cloud',
            'Deep Learning',
            'NLP & CV',
            'Data Engineering',
            'Python & Frameworks'
          ],
          datasets: [{
            label: 'Expertise Level',
            data: [95, 90, 88, 92, 85, 95],
            backgroundColor: colors.primaryTransparent,
            borderColor: colors.primary,
            borderWidth: 3,
            pointBackgroundColor: colors.primary,
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: colors.primary,
            pointHoverBorderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: 20
          },
          animation: {
            duration: 1200,
            easing: 'easeOutQuart'
          },
          scales: {
            r: {
              angleLines: {
                color: colors.grid,
                lineWidth: 1
              },
              grid: {
                color: colors.grid,
                circular: true
              },
              pointLabels: {
                color: colors.text,
                font: {
                  size: 13,
                  weight: '500',
                  family: "'Inter', sans-serif"
                },
                padding: 15
              },
              ticks: {
                display: true,
                color: colors.textSecondary,
                backdropColor: 'transparent',
                font: {
                  size: 11
                },
                stepSize: 20,
                showLabelBackdrop: false
              },
              beginAtZero: true,
              min: 0,
              max: 100,
              suggestedMin: 0,
              suggestedMax: 100
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                color: colors.text,
                font: {
                  size: 13,
                  weight: '600'
                },
                padding: 15,
                usePointStyle: true
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: colors.text,
              bodyColor: colors.text,
              borderColor: colors.primary,
              borderWidth: 1,
              padding: 12,
              displayColors: true,
              callbacks: {
                label: function(context) {
                  return context.dataset.label + ': ' + context.parsed.r + '%';
                }
              }
            }
          }
        }
      });

      console.log('✅ Radar chart initialized');
    } catch (error) {
      console.error('❌ Radar chart error:', error);
    }
  }

  // Doughnut Chart Configuration
  const doughnutCtx = document.getElementById('skillsDoughnutChart');
  if (doughnutCtx) {
    // Destroy existing chart
    if (window.doughnutChart) {
      window.doughnutChart.destroy();
    }

    // Force canvas size
    doughnutCtx.style.maxWidth = '500px';
    doughnutCtx.style.maxHeight = '500px';

    try {
      window.doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: [
            'Python & ML',
            'LLMs & GenAI',
            'AWS & Cloud',
            'MLOps & DevOps',
            'Data Engineering'
          ],
          datasets: [{
            data: [30, 25, 25, 12, 8],
            backgroundColor: [
              'rgba(59, 130, 246, 0.85)',   // Blue
              'rgba(16, 185, 129, 0.85)',   // Green
              'rgba(245, 158, 11, 0.85)',   // Orange
              'rgba(139, 92, 246, 0.85)',   // Purple
              'rgba(236, 72, 153, 0.85)'    // Pink
            ],
            borderColor: [
              'rgb(59, 130, 246)',
              'rgb(16, 185, 129)',
              'rgb(245, 158, 11)',
              'rgb(139, 92, 246)',
              'rgb(236, 72, 153)'
            ],
            borderWidth: 2,
            hoverBorderWidth: 3,
            hoverOffset: 10
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          layout: {
            padding: 10
          },
          animation: {
            duration: 1200,
            easing: 'easeOutQuart'
          },
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: colors.text,
                padding: 15,
                font: {
                  size: 12,
                  weight: '500'
                },
                usePointStyle: true,
                pointStyle: 'circle'
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
              titleColor: colors.text,
              bodyColor: colors.text,
              borderColor: colors.primary,
              borderWidth: 1,
              padding: 12,
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.parsed || 0;
                  return label + ': ' + value + '%';
                }
              }
            }
          },
          cutout: '65%'
        }
      });

      console.log('✅ Doughnut chart initialized');
    } catch (error) {
      console.error('❌ Doughnut chart error:', error);
    }
  }
}

// Initialize when Chart.js is loaded
if (typeof Chart !== 'undefined') {
  initSkillsChartsFixed();
} else {
  // Wait for Chart.js to load
  const checkChartJs = setInterval(() => {
    if (typeof Chart !== 'undefined') {
      clearInterval(checkChartJs);
      initSkillsChartsFixed();
    }
  }, 100);
}

// Re-initialize on theme change
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    setTimeout(initSkillsChartsFixed, 300);
  });
}

console.log('📊 Chart fix script loaded');
