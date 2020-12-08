package multi.math.thread;

class MathCos extends Thread {
    public double deg;
    public double res;
    public MathCos(int degree)
    { deg = degree; }

    public void run() {
        System.out.println(" Execute cos" + deg);
        double Deg2Rad = Math.toRadians(deg);
        res= Math.cos(Deg2Rad);
        System.out.println("Exit MathCos . Res = " + res);
    }
}
