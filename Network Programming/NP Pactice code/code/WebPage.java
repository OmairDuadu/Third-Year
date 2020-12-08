import java.net.*;
import java.io.*;

class WebPage  {
	 public static void main(String [] args ){
		 try {
			 URL u = new URL("http://www.dit.ie");
			 InputStream in = u.openStream();
			 int c;
			 while ((c = in.read()) != -1) 
				 System.out.write(c);
			 in.close();
			}
		 catch (Exception ex) {
			 System.err.println(ex);
	}	}	}


