// basic file operations
#include <iostream>
#include <fstream>
using namespace std;

#define ARRAYSIZE(a) \
  ((sizeof(a) / sizeof(*(a))) / static_cast<size_t>(!(sizeof(a) % sizeof(*(a)))))

// adds neccessary files
int main(){

  // start file
  file.open ("../assets/keys/keys.js");

  //TODO: allow access to a keyserver and retrieve specific keys that way instead of this manual way

  // list services
  string services[] = {"sendgrid"};

  int arr_length = ARRAYSIZE(services);

  cout << arr_length;
  string *development_keys = new string[arr_length];
  string *production_keys = new string[arr_length];

  cout << "Welcome to HackMerced's main website setup\n";
  cout << "Please enter the following keys to generate the proper keyfile";
  cout << "\n";

  // enter services
  for(int i = 0; i < arr_length; i++){
    cout << "What is your " << services[i] << " development key: ";
    cin >> development_keys[i];
    cout << "What is your " << services[i] << " production key: ";
    cin >> production_keys[i];
  }

  cout << "\n";

  ofstream file;


  file << "module.exports = function(status)  {\n";
  file << "if (!status) {\n";
  file << "   status = 'development'\n";
  file << "}\n";

  for(int i = 0; i < arr_length; i++){
    file << "var " << services[i] << "_keys = {\n";
    file << " development:'" << development_keys[i] << "',\n";
    file << " production:'" << production_keys[i] << "',\n";
    file << "}\n";
  }

  file << "return {\n";
  file << "     status:status,\n";
  for(int i = 0; i < arr_length; i++){
    file << services[i] << ":" << services[i] << "_keys[status],\n";
  }

  file << "    }\n";
  file << " } \n";

  file.close();

  return 0;
}
