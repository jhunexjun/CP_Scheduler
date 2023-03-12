To do's:
Had discussions with Francis regarding the Dashboard project and Scheduler. Few things to change like

http://localhost:3000/admin/appointment/6796B252-7279-47D1-9BE9-986EDD99D6C8
http://localhost:3000/admin/appointment/40861D3E-BD62-4C96-BC72-6A1DEF6A7309


Graph should starts with Sales amt, qty, etc.
Dropdown for the top 5 stores.
Some label changes.
To copy database of Lefty's and restore it to my SQL Server.
Replace my current express ed. of SQL server to standard.
----------------------------
let clonedArray = JSON.parse(JSON.stringify(nodesArray))



http://localhost:3000/admin/appointment

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
11. Expiry session in minutes setting to put in the database or .env

 http://localhost:3000/admin/appointment/6796B252-7279-47D1-9BE9-986EDD99D6C8
http://localhost:3000/admin/appointment/40861d3e-bd62-4c96-bc72-6a1def6a7309
10. Buttom preview work order in rpt form


Future add-ons
1. Send email
2. Send text

Issues:
1. Routes in Side menu. - fixed.
2. Autolog out must fetch() to update db.
3. Rename invoices to workOrders.
4. fetch invoices do not responds to expired session.

Done:
Create batch file and call it from Counterpoint.
Test the scheduler by creating invoice from
Add new schedule
Searchable technician and Work order.
Remove other menus and remain the scheduler.
Remove login
Use the VI_PS_DOC_NOTES
Make it searchable by a certain critiria.
Make the description and work order details bigger.
Total tickets not total trx count
COGS whould be at 3rd
Sales, Qty, Cost

Notes:

GREENVILLE
http://localhost:3000/createsession?userid=ADAML
http://localhost:3000/createsession?userid=BILLY
http://localhost:3000/createsession?userid=GREGM

HOUSTON
http://localhost:3000/createsession?userid=GREG

RALEIGH
http://localhost:3000/createsession?userid=HAYDEN