
package question.two;
import java.net.*;
import java.io.*;
import java.util.Scanner;
public class Client {
    public static void main(String[] args) {
try {
Socket client = new Socket( "localhost",5000 );
System.out.println("Client is connected to Server");
ObjectOutputStream out = new ObjectOutputStream( client.getOutputStream() );
ObjectInputStream in = new ObjectInputStream( client.getInputStream() );
Scanner input = new Scanner( System.in);
while (true) {
System.out.println("Enter your Message");
String message = input.nextLine();
out.writeObject(message);
message = ( String ) in.readObject();
System.out.println ("Message from Server:  " + message);
if (message.equals("bye")) {
    System.out.println("Shutting down");
    break;
}
}
}
catch (Exception ex) {
System.err.println(ex);
}
}
}