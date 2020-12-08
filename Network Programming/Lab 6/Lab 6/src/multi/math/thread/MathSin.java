package multi.math.thread;

class MathSin extends Thread {
    public double deg;
    public double res;
    public MathSin(int degree) { deg = degree; }


    public void run() {
        System.out.println(" Execute sin" + deg );
        double Deg2Rad=Math.toRadians(deg);
        res = Math.sin(Deg2Rad);
        System.out.println("Exit MathSin . Res = " + res);
    }
}
