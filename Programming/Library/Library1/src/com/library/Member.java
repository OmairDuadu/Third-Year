package com.library;

public class Member extends Person
{
    private int id;
    private String expirationDate;

    public Member(int id, String expirationDate, String name, String address, int phoneNumber)
    {
        super(name, address, phoneNumber);
        this.id = id;
        this.expirationDate = expirationDate;
    }

    //Getters and Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getExpirationDate() { return expirationDate; }
    public void setExpirationDate(String expirationDate) { this.expirationDate = expirationDate; }
}
