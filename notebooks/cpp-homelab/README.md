cmake_minimum_required(VERSION 3.15)
project(homelab VERSION 1.0)

# Specify C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Add source files
add_subdirectory(src)

# Enable testing
enable_testing()
add_subdirectory(tests)