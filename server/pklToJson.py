import pickle
import pandas as pd

with open ('keywords_1.pkl', 'rb') as input_file:
    new_dict = pickle.load(input_file)
    print(new_dict)


    # /Users/surajbodapati/Desktop/University_at_Buffalo/SEM1/Information_Retreival/Assignments/p4/CSE-535-Project-4--master/ProjectIR/src
