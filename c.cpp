// // #include <iostream>
// // #include <cmath>
// // #include <string>
// // using std::cin ;
// // using std::cout;
// // using std::endl;
// // using std::string;
// // int hope(int a=2, int b=1){
    
// //     // cout<<"enter the value of a \n"<<endl;
// //     // cin >> a;
// //     // cout << "enter the value of b \n"<<endl;
// //     // cin >>b;
// //     // cout<<"function to find a+b"<<endl;  
// //     string str = "this is a string \n";
// //     getline(cin,str);
// //     cout <<  str<<"\n";  
// //     cout <<"type of\a\a\a\a\a\a\a\a\a a " << sizeof(long long);
// //     return a+b;
// // };

// // int main(){
// //     cout << pow(hope(3,4),2); 

// // }
// #include <iostream>
// #include <fstream>
// #include <vector>


// int main(){
//     std::vector<std::string> comments;
//     std::ofstream wfile ("hello.txt",std::ios::app);
//     std::ifstream rfile("hello.txt");
//     std::string input;
//     wfile << " hello world";
//     getline(rfile,input);
//     std::cout << input;
//     // while(rfile >> input) 
//     //     {
//     //         comments.push_back(input);
//     //     }
//     // for(std::string name : comments){
//     //     std::cout << name <<std::endl;
//     // }
    
//     return 0;
// }

// #include <iostream>

// struct Users{
//     std::string first_name;
//     std::string lastname;
//     private:
//         int ID=1;
//     public:
//         int ID_copy(){
//             return ID;
//         };
    
     
// };

// int main(){
//     Users client;
//     client.first_name = "Noubissie";
//     client.lastname = "landry placid";
//     client.ID_copy();
//     std::cout << client.first_name <<std::endl<<client.lastname<<std::endl<<client.ID_copy()<<std::endl;

//     return 0;
// }


#include <iostream>

class Users{
    int ID=1;
     
    public:
        std::string first_name;
        std::string lastname; 
        int ID_copy(){
            return ID;
        };
    
     
};

int main(){
    Users client;
    client.first_name = "Noubissie";
    client.lastname = "landry placid";
    client.ID_copy();
    std::cout << client.first_name <<std::endl<<client.lastname<<std::endl<<client.ID_copy()<<std::endl;

    return 0;
}