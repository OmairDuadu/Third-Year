import java.net.*; 
public class IPCompare {
	 public static void main (String args[]) {
		 try {
			 InetAddress dit = InetAddress.getByName("www.dit.ie");
			 InetAddress comp = InetAddress.getByName("www.maths.dit.ie");
			 System.out.println(dit);
			 System.out.println(comp);
			 if (dit.equals(comp)) 
				 System.out.println("www.dit.ie is the same IP as www.maths.dit.ie");
			 else 
				 System.out.println("www.dit.ie is not same IP as www.maths.dit.ie");
			}
		 catch (UnknownHostException ex) {
			 System.out.println(ex);
	}	}	}