# ITP HR Form Filler

A JavaScript utility script that automates the process of filling HR time tracking forms. This tool helps streamline the data entry process for recording overtime and task descriptions.

## Features

- Automatically fills form fields from tabulated data (excel/tsv)
- Handles date formatting
- Processes time entries (start and end times)
- Supports overtime percentages (50% and 100%)
- Includes task description field
- Auto-fills current month
- Supports up to 7 entries per form

## Usage

1. Open your browser's developer tools console (usually F12 key)

2. Copy the entire contents of `hr-form-filler.js` and paste it into the browser console

3. Copy your data in tab-separated format with the following columns:
   - Date
   - Start Time
   - End Time
   - 50% Overtime
   - 100% Overtime
   - Description

4. When prompted, paste your data into the input dialog

5. The script will automatically:
   - Format dates properly
   - Convert time formats
   - Fill in all form fields
   - Update the form's internal state

## Data Format Requirements

Your input data should be organized in columns and separated by tabs:
```
Date    Start Time    End Time    50% OT    100% OT    Description
07/11/2025   18:00        20:00       2         0          Project meeting
```

## Technical Details

- The script works with form inputs in an iframe context
- Automatically handles form field positioning and organization
- Tries to detect and adapt to different date formats
- Manages internal form state updates
- Performs automatic data formatting and validation

## Limitations

- Maximum of 7 entries per form
- Requires data to be in tab-separated format
- Date must be in dd/mm/yyyy or mm/dd/yyyy format
- Times should be in hh:00 format
