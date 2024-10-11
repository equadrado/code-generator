#!/bin/bash

folder1="dist"
folder2="dist1"
output_file="folder_comparison_results.txt"

# Ensure the folders exist
if [ ! -d "$folder1" ] || [ ! -d "$folder2" ]; then
    echo "Error: One or both folders do not exist."
    exit 1
fi

# Compare the folders and save the output to a file
diff -r "$folder1" "$folder2" > "$output_file"

# Check if there are any differences
if [ -s "$output_file" ]; then
    echo "Differences found between $folder1 and $folder2."
    echo "Results have been saved to $output_file"
    echo "Summary of differences:"
    echo "------------------------"
    
    # Count the number of files that differ
    different_files=$(grep "^diff" "$output_file" | wc -l)
    echo "Files that differ: $different_files"
    
    # Count files only in folder1
    only_in_folder1=$(grep "Only in $folder1" "$output_file" | wc -l)
    echo "Files only in $folder1: $only_in_folder1"
    
    # Count files only in folder2
    only_in_folder2=$(grep "Only in $folder2" "$output_file" | wc -l)
    echo "Files only in $folder2: $only_in_folder2"
    
    echo "------------------------"
    echo "For detailed results, please check $output_file"
else
    echo "No differences found between $folder1 and $folder2."
    rm "$output_file"
fi
