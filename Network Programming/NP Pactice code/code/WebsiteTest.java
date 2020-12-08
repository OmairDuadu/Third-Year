import java.net.*; 
public class WebsiteTest {
	 public static void main (String[] args) {
		 try {
			 InetAddress ia = InetAddress.getByName("www.java2s.com");
			 boolean reachable = ia.isReachable(2000);
			 if(reachable)
			     System.out.println("Website Server is Online");
			 else
				 System.out.println("Website Server is Down...");
			}
		 catch (Exception ex) {
			 System.out.println(" Can't find the IP ");
	}	}	}