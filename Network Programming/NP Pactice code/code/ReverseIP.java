import java.net.*; 
public class ReverseIP {
	 public static void main (String[] args) {
		 try {
			 InetAddress ia = InetAddress.getByName("147.252.25.70");
			 System.out.println(ia.getCanonicalHostName());
			}
		 catch (Exception ex) {
			 System.out.println(" Can't find the URL ");
	}	}	}