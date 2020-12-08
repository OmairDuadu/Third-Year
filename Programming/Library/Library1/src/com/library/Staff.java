package com.library;

public class Staff extends Person {

    private int id;
    private String startDate;
    private String shift;
    private String position;

    public Staff(int id, String startDate, String shift, String position, String name, String address,int  phoneNumber)
    {
        super(name, address,phoneNumber);
        this.id = id;
        this.startDate = startDate;
        this.shift = shift;
        this.position = position;
    }

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getStartDate() {
        return startDate;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getShift() {
        return shift;
    }
    public void setShift(String shift) {
        this.shift = shift;
    }

    public String getPosition() {
        return position;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
