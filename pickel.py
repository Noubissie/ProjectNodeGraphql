import pickle
mypic = pickle.dumps(123456)
print(mypic)
# with open("pickle.pkl","wb") as f:
#     pickle.dump(12343213,f)

with open("pickle.pkl","rb") as f:
    pic = pickle.load(f)

print(pic)