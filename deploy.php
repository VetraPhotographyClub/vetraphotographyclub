<?php
// GitHub Secret Token – Must match GitHub webhook secret exactly

// Read the raw POST data from GitHub
$payload = file_get_contents("php://input");

// Change to the web root directory
chdir('/var/www/html');

// Run git pull
$output = shell_exec('git pull origin main 2>&1');

// Output response for debugging
echo "<pre>$output</pre>";
?>
