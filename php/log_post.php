<?PHP

  // Allow cross origin = CORS
  if (isset($_SERVER['HTTP_ORIGIN'])) {
     header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
     header('Access-Control-Allow-Credentials: true');
     header('Access-Control-Max-Age: 86400');    // cache for 1 day
  }
  // Access-Control headers are received during OPTIONS requests
  if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
         header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

     if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
         header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

  } else { // POST request assumed
    // security: prevent uploading PHP files or other executable scripts
    // by filtering JSON and nothing else but JSON
    // by using json_decode() and json_encode()

    // get raw POST data string
    $raw_data = file_get_contents('php://input');

    // decode string into PHP array for security reasons
    $json_data = json_decode( $raw_data, true, 512, JSON_UNESCAPED_UNICODE );

    // add server data
    if (!empty($_SERVER['HTTP_CLIENT_IP'])){
        $ip=$_SERVER['HTTP_CLIENT_IP'];
      }
      elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])){
        $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
      }
      else {
        $ip=$_SERVER['REMOTE_ADDR'];
      }

    $json_data["IP"] = $ip;

    // add server data
    if ( isset( $_SERVER['HTTP_REFERER'] )){
      $json_data["HTTP_REFERER"] = $_SERVER['HTTP_REFERER'];
    }

    // add server date
    $json_data["server_date"] = date("Y-m-d H:i:s");

    // security: locate directory of log files outside of WWW folders
    // $dir = "../../logs/";
    $dir = "logs/";

    // unique filename with time stamp and unique ID
    $filename = $dir . time() . '_' . uniqid() . ".json";

    // write JSON code to the new file
    file_put_contents( $filename, json_encode( $json_data, JSON_UNESCAPED_UNICODE ) );

  }

  // for debugging use the following:

  // include_once( '/var/www/data/inc/response.php' );
  // response( $results );

  // error_log( "results = " . var_export( $results, true) );
  // error_log( $filename );
  // file_put_contents( $filename, var_export( $results, true) ); // PHP code

?>