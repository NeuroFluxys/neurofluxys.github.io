<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $to = "https://formspree.io/f/xblkrqva"; // Buraya kendi emailinizi yazın
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    $subject = "NeuroFluxy'den Yeni Mesaj";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $body = "<h2>Yeni İletişim Formu Mesajı</h2>
             <p><strong>Adı:</strong> $name</p>
             <p><strong>Email:</strong> $email</p>
             <p><strong>Mesaj:</strong> $message</p>";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "<script>alert('Mesajınız gönderildi!'); window.location.href = 'index.html';</script>";
    } else {
        echo "<script>alert('Gönderim başarısız!'); window.location.href = 'index.html';</script>";
    }
}
?>