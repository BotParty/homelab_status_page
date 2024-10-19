#!/bin/bash

# Output markdown or CSV format
OUTPUT_TYPE=${1:-"markdown"}  # default to markdown if no argument passed

# Define file name
OUTPUT_FILE="components_specs.$( [ "$OUTPUT_TYPE" == "csv" ] && echo csv || echo md)"

# Data of components
declare -A COMPONENTS=(
    ["FLOPS"]="738 FP16 TFLOPS,991 FP16 TFLOPS,1.36 FP16 PFLOPS"
    ["GPU Model"]="6x 7900XTX,6x 4090,8x 4090"
    ["GPU RAM"]="144 GB,192 GB,"
    ["GPU RAM bandwidth"]="5760 GB/s,6050 GB/s,8064 GB/s"
    ["GPU link bandwidth"]="Full PCIe 4.0 x16 (64 GB/s),Full PCIe 4.0 x16 (64 GB/s),Full PCIe 4.0 x16 (64 GB/s)"
    ["CPU"]="32 core AMD EPYC,2x AMD GENOA,"
    ["System RAM"]="128 GB,384 GB,"
    ["System RAM bandwidth"]="204.8 GB/s,921.6 GB/s,"
    ["Disk size"]="4 TB raid array + 1 TB boot,1 TB boot,"
    ["Disk read bandwidth"]="28.7 GB/s,Use network,"
    ["Networking"]="2x 1 GbE + open OCP3.0 slot (up to 200 GbE),2x open PCIe5 x16,"
    ["Noise"]="< 50 dB, 31 low speed fans,Loud,"
    ["Power Supply"]="2x 1600W, 100V~240V,4x 2000W, 200V+,"
    ["BMC"]="AST2500,AST2600,"
    ["Operating System"]="Ubuntu 22.04,Ubuntu 22.04,"
    ["Dimensions"]="12U, 16.25\" deep, 90 lbs,4U, 31\" D, 88 lbs,"
    ["Rack?"]="Freestanding or rack mount,Supermicro rails,"
    ["Driver Quality"]="Mediocre,Great,"
    ["SHIPPING"]="BUY NOW FOR $15,000,BUY NOW FOR $25,000,PREORDER $40,000"
)

# Function to print markdown
function print_markdown {
    echo "| Component                | Red                   | Green                 | Pro                  |" > $OUTPUT_FILE
    echo "|--------------------------|-----------------------|-----------------------|----------------------|" >> $OUTPUT_FILE

    for component in "${!COMPONENTS[@]}"; do
        IFS=',' read -ra SPECS <<< "${COMPONENTS[$component]}"
        echo "| **$component** | ${SPECS[0]} | ${SPECS[1]} | ${SPECS[2]:-} |" >> $OUTPUT_FILE
    done
}

# Function to print CSV
function print_csv {
    echo "Component,Red,Green,Pro" > $OUTPUT_FILE

    for component in "${!COMPONENTS[@]}"; do
        IFS=',' read -ra SPECS <<< "${COMPONENTS[$component]}"
        echo "$component,${SPECS[0]},${SPECS[1]},${SPECS[2]:-}" >> $OUTPUT_FILE
    done
}

# Choose output format
if [ "$OUTPUT_TYPE" == "csv" ]; then
    print_csv
else
    print_markdown
fi

echo "Components and specs saved to $OUTPUT_FILE"
