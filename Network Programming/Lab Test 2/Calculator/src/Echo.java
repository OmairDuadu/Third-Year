import java.awt.*;
import java.applet.*;
import java.awt.event.*;

public class Echo extends Applet {
    TextArea output;
    TextField input;
    String s;
    Checkbox escape;
    boolean bool=true;
    String args;

    public void init () {
        setLayout(new BorderLayout());
        final Applet Echo = this;
        s = "enter some text";
        input = new TextField(s);
        this.add(input,BorderLayout.SOUTH);
        output = new TextArea("");
        this.add(output,BorderLayout.CENTER);
    }

    public class Listener implements ActionListener, ItemListener {
        public  void actionPerformed(ActionEvent e) {
            args = this.getParameter("parameter");
            input.getText();
            output.setText(input.getText());
            if (bool) {
                System.out.println(args.replaceAll("\\\\n", "\n").replaceAll("\\\\t","\t"));
            } else {
                System.out.println(args);
            }
        }

        private String getParameter(String parameter) {
            return parameter;
        }

        public void itemStateChanged(ItemEvent ie) {
            if(!escape.getState())
                bool=false;
        }
    }
}