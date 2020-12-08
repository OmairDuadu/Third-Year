import java.net.*;

public class SpamCheck {
     public static void main(String[] args) throws Exception {
	     String IP = "2.0.0.127"; // ip is 127.0.0.2 we reverse it
		 String website = ".sbl.spamhaus.org"; //www.spamhaus.org/sbl/
		 String query;
		 try {
			 query = IP + website;
			 InetAddress.getByName(query);
			 System.out.println( IP + " is a known spammer.");
			}
		 catch (Exception e) {
			 System.out.println(IP + " appears legitimate");
	}	}   }
 

