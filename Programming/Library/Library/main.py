"""
This is a Library program which is run through a menu.
The user has the option between 5 functions which are,
1. Add a Book to the Library.
2. Loan a Book from the Library.
3. Search for a Book in the Library.
2. Add a Member to the Library.
5. Add a Staff to the Library.

The menu only runs 5 times before ending.

Author : Omair Duadu
Date : 15/08/2020
Program : Library
Editor: Pycharm
"""


"""Library Class is the main in class in which most of the functions work in"""


class Library:
    """Constructor"""

    def __init__(self):
        self.Book = []
        self.Member = []
        self.Staff = []

    """Method for adding in a book"""

    def add_book(self):
        file_name = input("Enter File Name :")
        f = open(file_name, "r")
        isbn = "ISBN " + f.readline()
        title = "Title " + f.readline()
        author = "Author " + f.readline()
        quantity = "Quantity " + f.readline()

        """Creating an object from the Book class"""
        book1 = Book(isbn, title, author, quantity)

        """adding book1 to the Book List"""
        self.Book.append(book1)


    def loan_book(self):

        check_book = input("Search for book with Title, Author : ")

        for m in self.Book:
            """To check if the tittle or isbn or author are in the library"""
            if check_book == m.title or m.author:
                print("You have loaned the book.Quantity has gone down by 1 ")
                m.quantity -= 1
                break
            else:
                print("Couldn't find book")
                break

    """Method to search if book is available in the Library"""

    def search(self):
        check_book = input("Search for book ISBN with Title or Author : ")
        for j in self.Book:
            """To check if the tittle or isbn or author are in the library"""
            if check_book == j.title or j.author:
                print("The ISBN for your query is : " + str(j.isbn))
                break
            else:
                print("Couldn't find book")
                break

    """Method for adding in a member of the library"""

    def add_member(self):
        name = input("Enter in member name : ")
        address = input("Enter in member Address : ")
        phone = input("Enter in member phone : ")
        identity = input("Enter in member identity : ")
        expiration_date = input("Enter in member expiration date : ")

        """creating an object from Member class"""

        member1 = Member(name, address, phone, identity, expiration_date)

        """Adding member1 to the Member List"""
        self.Member.append(member1)

        """Printing out all the Member"""
        printy = int(input("\nEnter in 1 if u want to print list of Members or "
                           "\n0 if you would like to skip : "))

        if printy == 1:
            for b in self.Member:
                print(b.print_member())

    """Method for adding in a Staff member"""

    def add_staff(self):
        name = input("Enter in staff name :")
        address = input("Enter in staff Address :")
        phone = input("Enter in staff phone :")
        identity = input("Enter in staff identity :")
        start_date = input("Enter in staff Start date :")
        position = input("Enter in staff position  :")
        shift = input("Enter in staff shift :")

        """creating an object from Staff class"""
        staff1 = Staff(name, address, phone, identity, start_date, position, shift)

        """Appending staff1 to the Staff List"""
        self.Staff.append(staff1)

        """Printing out all the Staff"""
        printy = int(input("\nEnter in 1 if u want to print list of Staff or "
                           "\n0 if you would like to skip : "))

        if printy == 1:
            for b in self.Staff:
                print(b.print_staff())

    """Default method for wrong menu entries"""

    @staticmethod
    def unknown_action():
        print("That option is unavailable")

    def start(self):
        """Manually entering some books so user can try loan and search for other books"""
        book2 = Book(12345, "Witcher", "Jacky", 1)
        book3 = Book(111, "Joe", "Bob", 1)
        book4 = Book(222, "Bed Time Story", "Jacky", 1)
        self.Book.append(book2)
        self.Book.append(book3)
        self.Book.append(book4)

        """Manually entering some members to print later """
        member2 = Member("Jack O'Connell", "1 Main Street", 892133, 1111, "12/12/2020")
        member3 = Member("sam O'Connell", "2 Main Street", 892144, 2222, "22/02/2022")
        self.Member.append(member2)
        self.Member.append(member3)

        """Manually entering staff members to print later"""
        staff2 = Staff("Eamon O'Connell", "3 Main Street", 89766, 3333, "01/03/2020", "Manager", "Morning")
        staff3 = Staff("Daemon O'Connell", "4 Main Street", 895624, 4444, "10/09/2020", "Sales", "Night")
        self.Staff.append(staff2)
        self.Staff.append(staff3)


class Book:
    """Constructor"""

    def __init__(self, isbn, title, author, quantity):
        self.isbn = isbn
        self.title = title
        self.author = author
        self.quantity = quantity

    '''Method to print the book details'''

    def myfunc(self):
        print("\n" + str(self.isbn) + " " + self.title +" " + self.author +" " + str(self.quantity))


class Person:
    """Constructor"""

    def __init__(self, name, address, phone):
        self.name = name
        self.address = address
        self.phone = phone


class Member(Person):
    """Constructor"""

    def __init__(self, name, address, phone, identity, expiration_date):
        super().__init__(name, address, phone)
        self.identity = identity
        self.expiration_date = expiration_date

    """Method to print the member details"""

    def print_member(self):
        print("\nName : " + self.name + ', Address : ' + self.address + ', Phone : '
              + str(self.phone) + ', Id : ' + str(self.identity) + ', Membership expiration : ' + self.expiration_date)


class Staff(Person):
    """Constructor"""

    def __init__(self, name, address, phone, identity, start_date, position, shift):
        super().__init__(name, address, phone)
        self.identity = identity
        self.start_date = start_date
        self.shift = shift
        self.position = position

    """Method to print the staff Details"""

    def print_staff(self):
        print("\nName : " + self.name + ', Address : ' + self.address + ', Phone : '
              + str(self.phone) + ', Id : ' + str(self.identity) + ', Start Date : '
              + self.start_date + ', Position ' + self.position + ", Shift : " + self.shift)


Lib1 = Library()
Lib1.start()

"""The menu is run by a while loop with a nested if statement which acts like a 
 switch statement. The while loop runs 5 times."""
x = 1
while x < 6:

    print("\n\nWelcome to the Library Menu\n")
    print("Please choose an option from the following: ")
    print("1. Add a Book to the Library. \n2. Loan a Book from the Library ")
    print("3. Search for a Book in the Library. \n4. Add a Member to the Library ")
    print("5. Add a Staff to the Library")

    option = int(input("\nYour option : "))

    if option == 1:
        Lib1.add_book()
    elif option == 2:
        Lib1.loan_book()
    elif option == 3:
        Lib1.search()
    elif option == 4:
        Lib1.add_member()
    elif option == 5:
        Lib1.add_staff()
    else:
        Lib1.unknown_action()
    x += 1

print("Thank You for visiting the library today!")
