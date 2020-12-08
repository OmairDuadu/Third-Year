package com.library;

public class Person
{
    private String Name;
    private String Address;
    private int phoneNumber;


    public Person(String name, String address, int phoneNumber)
    {
        this.Name = name;
        this.Address = address;
        this.phoneNumber = phoneNumber;
    }

    public String getName() {
        return Name;
    }

    public void setName(String name) {
        Name = name;
    }

    public String getAddress() {
        return Address;
    }

    public void setAddress(String address) {
        Address = address;
    }

    public int getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(int phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
