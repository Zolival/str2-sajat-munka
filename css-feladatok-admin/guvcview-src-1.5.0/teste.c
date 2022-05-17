#include <stdlib.h>
#include <stdio.h>
#include <locale.h>

float x;

void main(int argc, char* argv[])
{
    x=0.5;
    char* lc_all = setlocale (LC_ALL, "");
    printf ("value=%.2f\n", x);
    setlocale(LC_NUMERIC, "C");
    printf ("value=%.2f\n", x);
    setlocale(LC_NUMERIC, "");
    printf ("value=%.2f\n", x);
}