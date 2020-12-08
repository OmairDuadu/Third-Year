package multi.math.thread;

class MathTan extends Thread {
    public double deg;
    public double res;
    public MathTan(int degree) { deg = degree; }

    public void run() {
        System.out.println(" Execute tan" + deg);
        double Deg2Rad = Math.toRadians(deg);
        res = Math.tan(Deg2Rad);
        System.out.println("Exit MathTan. Res = " + res);
    }
}
