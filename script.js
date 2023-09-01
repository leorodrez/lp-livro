document.getElementById("buyButton").addEventListener("click", function() {
    window.location.href = "https://www.amazon.com.br/Luto-Nacional-presidente-choque-suspeitos-ebook/dp/B0CGTS19N2/ref=sr_1_1?crid=UVYSKD7F1T8A&keywords=luto+nacional&qid=1693577979&sprefix=luto+nacional%2Caps%2C243&sr=8-1";
});

window.onload = function() {
    var ctx = document.getElementById('myPieChart').getContext('2d');
    var myPieChart = new Chart(ctx, {
      type: 'pie', // tipo de gráfico
        data: {
            labels: ['Mistério', 'Sangue', 'Suspense', 'Segredos de Família', 'Plot Twist'],
            datasets: [{
            data: [40, 5, 25, 15, 15], // porcentagens
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)'
            ]
            }]
        }
        });
};

const buyButton = document.getElementById('buyButton2');

// Adiciona um "event listener" para capturar o evento de clique
buyButton.addEventListener('click', function() {
  // Redireciona para o site desejado
    window.location.href = 'https://www.amazon.com.br/Luto-Nacional-presidente-choque-suspeitos-ebook/dp/B0CGTS19N2/ref=sr_1_1?crid=UVYSKD7F1T8A&keywords=luto+nacional&qid=1693577979&sprefix=luto+nacional%2Caps%2C243&sr=8-1';
});
