package main

import (
	"bufio"
	"fmt"
	"log"
	"os"
	"sort"
	"strconv"
	"strings"
)

func read() ([]int, []int, error) {
	file, err := os.Open("input.txt")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var left []int
	var right []int
	for scanner.Scan() {
		line := scanner.Text()
		if line == "" {
			continue
		}
		parts := strings.Split(line, "   ")
		l, err := strconv.Atoi(parts[0])
		if err != nil {
			return nil, nil, err
		}
		r, err := strconv.Atoi(parts[1])
		if err != nil {
			return nil, nil, err
		}
		left = append(left, l)
		right = append(right, r)
	}

	if err := scanner.Err(); err != nil {
		return nil, nil, err
	}

	return left, right, nil
}

func main() {
	left, right, err := read()
	if err != nil {
		log.Fatal(err)
	}

	sort.Ints(left)

	sort.Ints(right)

	total := 0

	for i, value := range left {
		distance := value - right[i]
		if distance < 0 {
			distance = -distance
		}
		total += distance
	}

	fmt.Println(total)
}
