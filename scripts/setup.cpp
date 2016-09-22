// basic file operations
#include <iostream>
#include <fstream>

using namespace std;



#define ARRAYSIZE(a) \
  ((sizeof(a) / sizeof(*(a))) / static_cast<size_t>(!(sizeof(a) % sizeof(*(a)))))

// adds neccessary files
int main(){

  // start file
  ofstream file;
  file.open ("assets/keys/keys.js");

  if(file.good()){
    //TODO: allow access to a keyserver and retrieve specific keys that way instead of this manual way

    // list services
    string services[] = {"sendgrid"};

    int arr_length = ARRAYSIZE(services);


    string *development_keys_client = new string[arr_length];
    string *development_keys_secret = new string[arr_length];
    string *production_keys_client = new string[arr_length];
    string *production_keys_secret = new string[arr_length];

    cout << "Welcome to HackMerced's main website setup\n";
    cout << "Please enter the following keys to generate the proper keyfile";
    cout << "\n";

    // enter services
    for(int i = 0; i < arr_length; i++){
      cout << "What is your " << services[i] << " development key client/id: ";
      cin >> development_keys_client[i];
      cout << "What is your " << services[i] << " development key secret: ";
      cin >> development_keys_secret[i];
      cout << "What is your " << services[i] << " production key client/id: ";
      cin >> production_keys_client[i];
      cout << "What is your " << services[i] << " production key secret: ";
      cin >> production_keys_secret[i];
    }


    file << "module.exports = function(status)  {\n";
    file << " if (!status) {\n";
    file << "   status = 'development'\n";
    file << " }\n";

    for(int i = 0; i < arr_length; i++){
      file << " var " << services[i] << "_keys = {\n";
      file << "   development:{ client:'" << development_keys_client[i] << "', secret:'" << development_keys_secret[i] << "' },\n";
      file << "   production:{ client:'" << production_keys_client[i] << "', secret:'" << production_keys_secret[i] << "' },\n";
      file << " }\n";
    }

    file << " return {\n";
    file << "   status:status,\n";
    for(int i = 0; i < arr_length; i++){
      file << "   " << services[i] << ":" << services[i] << "_keys[status],\n";
    }

    file << "  } \n";
    file << "} \n"; // end of line


    cout << "File written, start your program :)\n" ;
  } else {
    cout << "\nERROR: You have placed this setup file not in the root directory, please move this to the root directory.\n\n";
  }

  file.close();

  return 0;
}
