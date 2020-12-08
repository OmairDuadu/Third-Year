package com.library;

public class Book {

    private int ISBN;
    private String Title;
    private String Author;
    private int Quantity;

    //Constructor
    public Book(int ISBN, String Title, String Author, int Quantity)
    {
        this.ISBN = ISBN;
        this.Title = Title;
        this.Author = Author;
        this.Quantity = Quantity;
    }


    //Getters and Setters
    public int getISBN() { return ISBN; }
    public void setISBN(int ISBN) { this.ISBN = ISBN; }

    public String getTitle() { return Title; }
    public void setTitle(String title) { Title = title; }

    public String getAuthor() { return Author; }
    public void setAuthor(String author) { Author = author; }

    public int getQuantity() { return Quantity; }
    public void setQuantity(int quantity) { Quantity = quantity; }
}
