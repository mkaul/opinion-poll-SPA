# logs directory

The Apache process running the HTTP server under the user-id "www-data" must have write access to this directory. 

Therefore the group should be "www-data":
* chgrp www-data logs

Grant the write access to the group:
* chmod 775 logs