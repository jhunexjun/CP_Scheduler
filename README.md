To do's:

12. Get the official operating hours.

Done:

Create batch file and call it from Counterpoint.
add day
technician
location
store
Counterpoint workgroup
employee by workgroup
Started to add more features based on the meeting yesterday.
 * To added a virtual login.
 * To add session auto log-out.
 * To add a dropdown list of technicians as filter of the scheduler.
 * Filter out scheds only to specific location.
 * Location from other stores cannot add sched from another store.
 * etc.
1. logo
2. store code and user logged in
3. 5 minutes or 10 minutes session expity
4. concat work order #, name, phone number, plate#
5. Put the CompuTant Logo at the bottom and web address and toll free.
6. Subject = service type
7. Work order detail as read-only. Auto populate.
8. Button for refresh and auto refresh 
9. Add the date/time notes in work order details and who wrote it.
10. Buttom preview work order in rpt form
11. Expiry session in minutes setting to put in the database or .env


Future add-ons:
1. Send email - Twilio pwd jshetWokAfrQ441a
2. Send text


Issues:
1. Routes in Side menu. - fixed.
2. Autolog out must fetch() to update db.
3. Rename invoices to workOrders.
4. fetch invoices do not responds to expired session.


Notes:

GREENVILLE
    http://localhost:3000/createsession?userid=ADAML
    http://localhost:3000/createsession?userid=BILLY
    http://localhost:3000/createsession?userid=GREGM

HOUSTON
    http://localhost:3000/createsession?userid=GREG

RALEIGH
    http://localhost:3000/createsession?userid=HAYDEN

Transparent logo
    https://online.inpixio.com/tools/auto-remove-background/edit/4516a3e7-0927-4ab1-b535-6812a71f847d


Added transparent logo
Removed robot params
Removed unnecessary code
Fixed bug wherein you have to refresh the page to delete or update newly added schedule.
Added /extendsession route.

Added the All Day panel, this has to be added because when scheduler adds item without the time because it assumes the time is whole day.
Corrected the minutes of inactivity.
Changed from milliseconds to minutes to input the inactivity of user.


Searched for the best pdf generator to display the report outside of Counterpoint.
Tried and tested them if it fits to this project.

Uninstall npm react-pdf-html soon.