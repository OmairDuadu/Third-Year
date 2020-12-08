package question.four;


import java.io.InputStream;
import java.io.OutputStream;
import java.net.Socket;
import java.util.Scanner;

    public class TCPClient {
    public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.println("1. Scan all local TCP ports");
    System.out.println("2. Get time from time.nist.gov");
    System.out.println("3. Get domain information from whois.internic.net");
    System.out.println("Enter a number: ");

    int input = scanner.nextInt();

    switch (input) {
    case 1:
    for (int port = 1; port <= 65535; port++) {
    try {
        Socket socket = new Socket("127.0.0.1", port);
        System.out.println("Port in use: " + port);
        socket.close();
    } catch (Exception exception) {
        System.out.println("Port not in use: " + port);
    }
    }

    case 2:
    try {
    Socket socket = new Socket("time.nist.gov", 13);
    socket.setSoTimeout(15000);
    InputStream in = socket.getInputStream();
    int c;
    while ((c = in.read()) != -1) {
        System.out.print((char) c);
    }
    socket.close();
    } catch (Exception exception) {
    System.err.println(exception);
    }
    case 3:
    try {
    String domain = scanner.nextLine();
    Socket socket = new Socket("whois.internic.net", 43);
    InputStream in = socket.getInputStream();
    OutputStream out = socket.getOutputStream();
    out.write(domain.getBytes());
    int c;
    while ((c = in.read()) != -1) {
        System.out.print((char) c);
    }
    socket.close();
    } catch (Exception exception) {
    System.err.println(exception);
    }
    }
    }
    }