package com.library;


import java.util.Scanner;

public class Control
{
    public static void main(String[] args)
    {
        Library library = new Library();
        // making a sample book object so the list is not empty
        library.start();
        int i =0;
        while (i<5) {
            System.out.println("\n\nWelcome to the Library Menu\n");
            System.out.printf("Please choose an option from the following: \n");
            System.out.printf("1. Add a Book to the Library. \n2. Loan a Book from the Library ");
            System.out.printf("\n3. Search for a Book in the Library. \n4. Add a Member to the Library ");
            System.out.printf("\n5. Add a Staff to the Library");

            System.out.println("\nSelect your option : ");
            Scanner scanner = new Scanner(System.in);

            int option = scanner.nextInt();

            switch (option) {
                case 1:

                    library.AddBook();
                    break;
                case 2:

                    library.LoanBook();
                    break;
                case 3:
                    library.searchBook();
                    break;
                case 4:
                    library.addMember();
                    break;
                case 5:
                    library.addStaff();
                    break;
                default:
                    System.out.printf("Invalid option!!");
                    break;

            }
            i++;

            System.out.println("Thank You for visiting the library today!");

        }

        //library.AddBook();
        //library.addMember();
        //library.addStaff();
        //library.searchBook();


    }
}
