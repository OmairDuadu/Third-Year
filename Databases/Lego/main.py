#!/usr/bin/env python
# coding: utf-8

# This program takes in a csv file that contains information on school book orders.   It generates javascript that can be run on a MongoDB instance to add documents.  In this case, the structure is:
#  -  A database called bookshop - hence 'use BookShop'
#  -  A collection called bookorder - hence 'db.bookorder.insert'
#  -  Each bookorder document has a single orderno, email,edate, custname, deladdr, Nett, postage and ordertotal instance and an embedded array of books ordered in that order.
#  -  In this case, the 'orderno' is unique, because we've dropped duplicates.
#

import pandas as pd
import json

# First, let's format our .js file:
# For the main program, we're reading in the csv file from the 'data' sub-directory and putting it into a Pandas dataframe.
# Then we extract a frame of  unique 'orderno' values.
# Then we make documents from the data and write insert statements to a file.

#Read the full csv into df.
df = pd.read_csv('inventories.csv', sep = ',', delimiter = None,encoding='latin-1')
# First, let's check the columns we have and make sure the names are okay and we want all of them.
print(df.columns)

#If our document is a book order, we want the orderno to identify the document, so we extract that, dropping duplicates.

lgset = df[['orderno']].drop_duplicates()
print(bkorder)

def writeOrderfile(filename):
# This writes document inserts to a .js file that can be run on a MongoDB client
    file = open(filename,'w')
    # It starts by choosing the BookShop database
    rec = 'use BookShop\n'
    file.write(rec)
    # For each unique orderno...
    for r in thisfile[['orderno']].itertuples(index=False):
        theserows = (df[(df['orderno']==r)])
        # Retrieve the info that will be in the main part of the document
        agginfo = theserows[['custname','email','edate','deladdr','Nett','postage','ordertotal']].drop_duplicates()
        # Retrieve repeating rows
        tc = theserows[[ 'Title', 'Author', 'Publisher', 'ISBN', 'cover', 'quantity',
                        'unitprice', 'subtotal', 'image']]
        #Make up the document
        entries = json.dumps({"orderno": r,
                              "email":agginfo['email'].values[0],
                               "edate": agginfo['edate'].values[0],
                               "custname": agginfo['custname'].values[0],
                               "deladdr": agginfo['deladdr'].values[0],
                               "books": tc.to_dict('records'),
                               "Nett": agginfo['Nett'].values[0],
                               "postage": agginfo['postage'].values[0],
                               "ordertotal": agginfo['ordertotal'].values[0]
                             })
        #Write the document insert statement to the .js file
        rec = 'db.bookorder.insert(' + entries + ')\n'
        file.write(rec)
    file.close()
    return()

filename = 'data/bookorders.js'
thisfile = bkorder
b = writeOrderfile(filename)