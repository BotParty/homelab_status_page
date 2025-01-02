# Homelab C++ Project

## Building the Project

## open capture zed 2i - pi-camera - environmental + stereoscopic camera - 

add_executable(homelab main.cpp)


## Project Structure

- `src/`: Source files
- `include/`: Header files
- `tests/`: Test files
- `docs/`: Documentation
- `build/`: Build artifacts (generated)

## Requirements

- CMake 3.15 or higher
- C++17 compatible compiler

find_package(Catch2 REQUIRED)
add_executable(tests test_main.cpp)
target_link_libraries(tests PRIVATE Catch2::Catch2)

git init
git add .
git commit -m "Initial commit"

mkdir build && cd build
cmake ..
make
./src/homelab