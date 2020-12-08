import java.net.*; 
class TestProtocol  {
	 public static void main(String [] args ){
		 testProtocol("http://www.dit.ie");
		 testProtocol("https://www.dit.ie");
	     testProtocol("ftp://dit.ie");
		 testProtocol("mailto:aneel.rahim@dit.ie");
		}

		public static void testProtocol(String url){
		 try {
			 URL u = new URL(url);
			 System.out.println(u.getProtocol() + " is supported");
			}
		 catch (Exception ex) {
			 System.out.println(url + " is not supported");
	}	} 	}

