using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows.Forms;

public class MyCursor
{
    [DllImport("user32.dll", CharSet = CharSet.Auto, CallingConvention = CallingConvention.StdCall)]
    public static extern void mouse_event(uint dwFlags, uint dx, uint dy, uint cButtons, uint dwExtraInfo);

    private const int MOUSEEVENTF_LEFTDOWN = 0x02;
    private const int MOUSEEVENTF_LEFTUP = 0x04;
    private const int MOUSEEVENTF_RIGHTDOWN = 0x08;
    private const int MOUSEEVENTF_RIGHTUP = 0x10;

    private bool _dragging = false;

    private int x, y;




    public MyCursor()
    {
        this.x = Cursor.Position.X;
        this.y = Cursor.Position.Y;
        Cursor.Position = new Point(x, y);
    }

    public void DoMouseLeftClick()
    {

        mouse_event(MOUSEEVENTF_LEFTDOWN, (uint)x, (uint)y, 0, 0);
        mouse_event(MOUSEEVENTF_LEFTUP, (uint)x, (uint)y, 0, 0);

        Console.WriteLine("CLick !");

    }

    [DllImport("user32.dll")]
    public static extern bool SetCursorPos(int X, int Y);

    public void SetPosition(int x, int y)
    {
        this.x = x;
        this.y = y;

        SetCursorPos(x, y);
    }



    public void Shift(int xShift, int yShift)
    {
        this.x += xShift;
        this.y += yShift;

        Cursor.Position = new Point(x, y);
    }


    public void Grab()
    {
        _dragging = true;
        mouse_event(MOUSEEVENTF_LEFTDOWN, (uint)x, (uint)y, 0, 0);

    }


    public void Grab(int xPos, int yPos)
    {
        this.x = xPos;
        this.y = yPos;

        Cursor.Position = new Point(x, y);

        Grab();

    }


    public void Release()
    {
        _dragging = false;
        mouse_event(MOUSEEVENTF_LEFTUP, (uint)x, (uint)y, 0, 0);
    }

    public void Release(int xPos, int yPos)
    {

        this.x = xPos;
        this.y = yPos;

        Cursor.Position = new Point(x, y);
        Release();

    }

    private void CheckMouseStatus()
    {
        do
        {
            //Cursor.Position = new Point(x,y);
            Console.WriteLine("grab");
        }
        while (_dragging);
    }
}