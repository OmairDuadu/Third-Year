import java.awt.Graphics;
import javax.swing.*;
public class AdditionApplet extends JApplet{
    double sum;
    public void init(){
        String firstNumber;
        String secondNumber;
        double number1;
        double number2;
        firstNumber = JOptionPane.showInputDialog("Enter first Number");
        secondNumber = JOptionPane.showInputDialog("Enter second Number");
        number1 = Double.parseDouble(firstNumber);
        number2 = Double.parseDouble(secondNumber);
        sum = number1 + number2;
    }

    public void paint (Graphics g){
        super.paint( g );
        g.drawRect(15, 10, 270, 20);
        g.drawString("The sum is " + sum, 25, 25);
    }
}
