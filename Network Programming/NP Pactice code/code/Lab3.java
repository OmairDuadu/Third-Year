
import java.net.InetAddress;
public class Lab3 {
    public static void main(String[] args) throws Exception {
        InetAddress inetAddress = InetAddress.getLocalHost();
        String ipAdd= inetAddress.getHostAddress(),revIpAdd = "";
        System.out.println("IP Address: " + ipAdd);

        for (int i=ipAdd.length()-1; i>=0; i--)
        {
            revIpAdd += ipAdd.charAt(i);
        }
        System.out.println("Reversed Ip Address: " + revIpAdd);
    }
}
