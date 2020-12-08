// It find the address ip4 or ip6 
import java.net.*;
public class IPTest {
	 public static void main (String[] args) {
		 try {
			 InetAddress ia = InetAddress.getByName(args[0]);
			 byte[] address = ia.getAddress();
			 if (address.length == 4)
				 System.out.println("IP4 Address");
			 else if (address.length == 16)
				 System.out.println("IP6 Address");
			}
			catch (Exception ex) {
			 System.out.println(" Can't find the IP ");
	}	}	}