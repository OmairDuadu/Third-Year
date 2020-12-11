import java.net.*;
import java.io.*;
import java.lang.Math;
public class Server {
    public static void main(String[] args) {
        try {
            ServerSocket server = new ServerSocket( 5000, 10 );
            System.out.println("Server is Running on port 5000");
            Socket connection = server.accept();
            ObjectOutputStream out = new ObjectOutputStream( connection.getOutputStream() );
            ObjectInputStream in = new ObjectInputStream( connection.getInputStream() );
            String message = "Connection successful";
            boolean end = false;
            String username = "DIT";
            String password = "TUDUBLIN";
            while (!end) {
                message = ( String ) in.readObject();
                try {
                    switch(message.toLowerCase()) {
                        case "register":
                            out.writeObject("Please send your name");
                            in.readObject();
                            out.writeObject("Please send your age");
                            in.readObject();
                            out.writeObject("Please send your phone number");
                            in.readObject();
                            out.writeObject("The Client is successfully registered");
                            break;
                        case "login":
                            out.writeObject("Please enter your username");
                            if (!(((String) in.readObject()).equals(username))) {
                                out.writeObject("Invalid username");
                                break;
                            }
                            out.writeObject("Please enter your password");
                            if (((String) in.readObject()).equals(password)) {
                                out.writeObject("You are successfully logged in");
                            }
                            else {
                                out.writeObject("Incorrect password");
                            }
                            break;
                        case "modify":
                            out.writeObject("Please send a new password");
                            password = (String) in.readObject();
                            out.writeObject("New password is "+password);
                            break;
                        case "bye":
                            end = true;
                            break;
                        default:
                            out.writeObject("Invalid input, please try again");
                    }
                }
                catch (Exception ex) {
                    out.writeObject("Invalid input");
                }
            }
            out.writeObject("bye");
            System.out.println("Shutting down");
        }
        catch (Exception ex) {
            System.err.println(ex);
        }
    }
}