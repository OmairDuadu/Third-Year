// It converts the URL string to IP 
import java.net.*;
public class IP {
    	public static void main (String[] args) {
			try {
				InetAddress address = InetAddress.getByName(args[0]);
				System.out.println(address);
			} 
			catch (Exception ex) {
				System.out.println(" Can't find the IP ");
			}
	}	}