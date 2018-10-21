<?PHP

  /**
   * finish php script and send message to client
   * in AJAX calls e.g. fetch requests
   * e.g. JSONP requests
   * @param $msg message
   */
  function response( $msg )
  {
    // encode message to JSON
    $msg = json_encode( $msg );

    // filter received dynamic function name (jsonp)
    $callback = filter_input( INPUT_GET, 'callback', FILTER_SANITIZE_STRING );

    // is cross domain request?
    if ( isset( $callback ) )
    {
      // padding message in function call (jsonp)
      $msg = $callback.'('.$msg.');';
    }

    // send message to client
    die( $msg );
  }

  // collect all log files from log directory
  // decode JSON into PHP arrays


  // use the same folder as in the log script
  // security: locate directory of log files outside of WWW folders
  // $dir = "../../logs/";
  $dir = "logs/";

  // collect all files in the directory "$dir" except '.', '..'
  $files = array_diff( scandir($dir), array('.', '..') );

  // push all of them into a single large array "$all"
  $all = array();
  foreach( $files as $file ){
    // array push
    $all[] = json_decode( file_get_contents( $dir . $file ) );
  }

  // encode the large array and send it back to the client
  response( $all );

?>