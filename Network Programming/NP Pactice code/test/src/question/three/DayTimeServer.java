package question.three;

import java.io.*;
import java.net.*;
import java.net.InetAddress;
public class DayTimeServer {
    public static void main(String args[  ]) throws java.io.IOException {
    String host = args[0];
    int port = 13;
    if (args.length > 1) port = Integer.parseInt(args[1]);
    DatagramSocket socket = new DatagramSocket( );
    socket.setSoTimeout(1000);
    byte[  ] buffer = new byte[512];
    DatagramPacket packet =  new DatagramPacket(buffer, buffer.length,
    new InetSocketAddress(host,port));
    for(int i = 0; i < 3; i++) {
    try {
    // Send an empty datagram to the specified host (and port)
    packet.setLength(0);
    socket.send(packet);
    packet.setLength(buffer.length);
    socket.receive(packet);
    System.out.print(new String(buffer, 0, packet.getLength( ),
    "US-ASCII"));
    break;
    }
    catch(SocketTimeoutException e) {
    System.out.println("No response");
    }
    }
    socket.close( );
    }
    }