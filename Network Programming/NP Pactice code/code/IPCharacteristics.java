import java.net.*; 
public class IPCharacteristics {
	 public static void main(String[] args) {
		 try {
			 InetAddress address = InetAddress.getByName(args[0]);

			 if (address.isSiteLocalAddress()) 
				 System.out.println(address + " is a local network address.");

			 if (address.isLoopbackAddress()) 
				 System.out.println(address + " is loopback address.");

			 if (address.isMulticastAddress()) 
			     System.out.println(address + " is a multicast address.");
			 else 
				 System.out.println(address + " is a unicast address.");
			}
			catch (UnknownHostException ex) {
				System.err.println("Could not resolve " + args[0]);
	}	}	}