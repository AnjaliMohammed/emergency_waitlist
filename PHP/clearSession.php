<?php
// Helper file to manually clear the session
session_start();
session_unset();
session_destroy();
?>