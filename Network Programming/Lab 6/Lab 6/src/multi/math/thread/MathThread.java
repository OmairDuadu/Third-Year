package multi.math.thread;
import java.lang.Math;
class MathThread {
    public static void main(String args[]) {
        MathSin st = new MathSin(45);
        MathCos ct = new MathCos(60);
        MathTan tt = new MathTan(30);
        st.start();
        ct.start();
        tt.start();
        try {// wait for completion of threads
            st.join();
            ct.join();//wait forMathCosobject
            tt.join();
            double z = st.res + ct.res + tt.res;
            System.out.println("Sum of sin cos tan = " + z);}
        catch
        (Exception e)
        { System.out.println(e);}
    }
}











