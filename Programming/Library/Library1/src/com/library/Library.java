package com.library;
/****************************
 *This is a Library program which is run through a menu.
 *The user has the option between 5 functions which are,
 *1. Add a Book to the Library.
 *2. Loan a Book from the Library.
 *3. Add a Member to the Library.
 *2. Add a Staff to the Library .
 *5. Search for a Book in the Library.
 *
 *The menu only runs 5 times before ending.
 *Author : Omair Duadu
 *Date : 15/08/2020
 *Program : Library
 *Editor : IntelliJ
 **********/
import java.util.ArrayList;
import java.util.Scanner;

public class Library
{
    //instantiating array lists
    private ArrayList<Book> books;
    private ArrayList<Member> members;
    private ArrayList<Staff> staff;


    public Library()
    {
        books = new ArrayList<Book>();
        members = new ArrayList<Member>();
        staff = new ArrayList<Staff>();
    }

    //Constructor
    public Library(ArrayList<Book> books, ArrayList<Member> members, ArrayList<Staff> staff)
    {
        this.books = books;
        this.members = members;
        this.staff = staff;


    }

    public void start()
    {
        Book book3 = new Book(900,"Witcher","John Doe",1);
        Book book4 = new Book(901,"Hunter","Jacky",1);
        Book book5= new Book(901,"Hunter","Jacky",1);
        Member member3 = new Member(1234, "12/03/2021", "Jack Miller", "21 Rosemount Way", 8921999);
        Member member4 = new Member(1232, "12/03/2023", "Jackey", "21 Rosemount Way, CA", 892188);
        books.add(book3);
        books.add(book4);
        books.add(book5);
        members.add(member3);
        members.add(member4);
    }

    //Method for adding a book
    public void AddBook()
    {
        System.out.println("Follow the instructions to add a Book.");
        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter Book Title =>");
        String Title = scanner.nextLine();

        System.out.println("Enter Book Author =>");
        String Author = scanner.nextLine();

        System.out.println("Enter ISBN =>");
        int Isbn = scanner.nextInt();

        System.out.println("Enter Quantity =>");
        int Quantity = scanner.nextInt();



        for (Book value : books)
        {
            if (Title == value.getTitle())
            {
                System.out.println("This book is already in the system");
                value.setQuantity(value.getQuantity() + 1);
                break;
            }
            else
            {
                Book book1 = new Book(Isbn, Title, Author, Quantity);
                books.add(book1);
                System.out.println("You have entered a new Book to the library");
                break;
            }
        }

    }


    //method for loaning a book
    public void LoanBook()
    {
        System.out.println("Follow the instructions to loan a Book.");

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter in the Title of a book:");
        String title = scanner.nextLine();
        System.out.println(books.size());
        for (Book value : books)
        {
            if (title == value.getTitle() )
            {
                System.out.println("That book is not available in the library.");
                break;
            }
            else
            {
                System.out.println("You have removed a copy of the library");
                value.setQuantity(value.getQuantity() - 1);
                break;
            }
        }

    }


    //Method to add members
    public void addMember()
    {
        //Using scanners to get the details of the user and storing them in their attributes
        System.out.println("Follow the instructions to add a Member.");
        Scanner scanner1 = new Scanner(System.in);

        System.out.println("Enter in Name:");
        String name = scanner1.nextLine();

        System.out.println("Enter Address:");
        String address = scanner1.nextLine();

        System.out.println("Enter Phone:");
        int phoneNumber = scanner1.nextInt();

        System.out.println("Enter in id:");
        int id = scanner1.nextInt();

        scanner1.nextLine();

        System.out.println("Enter in membership expiration date:");
        String date = scanner1.nextLine();

        System.out.println(members.size());
        for(int i=0; i<members.size(); i++)
        {
            if(id == members.get(i).getId())
            {
                System.out.println("Member already exists");
                break;
            }
            else
            {
                Member member = new Member(id, date, name, address, phoneNumber);
                members.add(member);
                System.out.println("You have entered a new library user Member");
                break;
            }
        }
    }

    //method to add staff
    public void addStaff()
    {
        //a
        System.out.println("Follow the instructions to add a Staff Member.");

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter in Name:");
        String name = scanner.nextLine();

        System.out.println("Enter Address:");
        String address = scanner.nextLine();

        System.out.println("Enter Phone:");
        int phoneNumber = scanner.nextInt();

        System.out.println("Enter in id:");
        int id = scanner.nextInt();
        scanner.nextLine();
        System.out.println("Enter in start Date:");
        String startDate = scanner.nextLine();

        System.out.println("Enter in shift:");
        String shift = scanner.nextLine();

        System.out.println("Enter in position:");
        String position = scanner.nextLine();

        for(int i=0; i < staff.size(); i++)
        {
            if(id == staff.get(i).getId())
            {

                System.out.println("Staff already exists:");
                break;
            }
            else
            {
                Staff staff1 = new Staff(id, startDate,shift, position, name, address, phoneNumber);
                staff.add(staff1);
                System.out.println("You have entered a new member of Staff.");
                break;
            }

        }
    }

    //method to search for isbn using title
    public void searchBook()
    {
        System.out.println("Follow the instructions to search for a Book.");

        Scanner scanner = new Scanner(System.in);

        System.out.println("Enter in the Title or Author of a book:");
        String title = scanner.nextLine();

        for (int i=0; i < books.size(); i++)
        {
            if (title == books.get(i).getTitle() )
            {
                System.out.println("That book is not available in the library.");
                 break;
            }
            else
            {
                System.out.println("This is the ISBN for : " + title +" is " + books.get(i).getISBN());
                break;
            }
        }
    }
    public ArrayList<Book> getBooks() { return books; }
    public void setBooks(ArrayList<Book> books) { this.books = books; }

    public ArrayList<Member> getMembers() { return members; }
    public void setMembers(ArrayList<Member> members) { this.members = members; }

    public ArrayList<Staff> getStaff() { return staff; }
    public void setStaff(ArrayList<Staff> staff) { this.staff = staff; }
}
